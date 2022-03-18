from rest_framework.views import APIView
from rest_framework.response import Response
import xml.etree.ElementTree as ET
from .serializers import CategorySerializer
from .models import Category
from rest_framework import status
import logging
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
from collections import OrderedDict


class ProcessFile(APIView):
    """
    File for xml file processing
    """

    namespaces = {'xmlns': 'urn:ebay:apis:eBLBaseComponents'}

    def post(self, request, format=None):
        try:

            uploaded_file = request.data['File']        
            
            # Store string file
            xml_string = ''
            # chucks() ensures that large files don’t overwhelm your system’s memory
            for part_file in uploaded_file.chunks():
                # Decode because part_file is byte types
                xml_string += part_file.decode("utf-8")


            # Convert string to processable xml
            xml_root = ET.fromstring(xml_string)
            # Get the unique categoryArray Element
            categories = xml_root.findall('xmlns:CategoryArray', self.namespaces)[0]

            categories_list = []
            
            # For each category
            for category in categories.findall('xmlns:Category', self.namespaces):
                categories_list.append(self.to_category_object(category))

            # insertion in a single query to improve application performance
            total_inserted = Category.objects.bulk_create(categories_list)

            response = dict(total_inserted=len(total_inserted),
                            error=False)
            return Response( response, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(f'Error ---> {str(e)}')
            return Response( dict(error=True), status=status.HTTP_201_CREATED)

    def find(self, category, elementToFind):
        ''' Find specific element of the category'''
        try:
            return category.find(f'xmlns:{elementToFind}', self.namespaces).text
        except:
            return None
    
    def to_category_object(self, category):
        '''Convert category xml object 
        to Category instance'''
        return Category(
                id = int(self.find(category, 'CategoryID')),
                name = self.find(category, 'CategoryName'),
                level = int(self.find(category, 'CategoryLevel')),
                best_offer_enabled = self.find(category, 'BestOfferEnabled')=='true',
                auto_pay_enabled = self.find(category, 'AutoPayEnabled')=='true',
                leaf = self.find(category, 'LeafCategory') =='true',
                lsd = self.find(category, 'LSD') =='true',
                parent_id = Category(id=int(self.find(category, 'CategoryParentID'))),
            )



class CustomPagination(PageNumberPagination):
    '''Override PageNumberPagination
    to get next and previos also integers or None
    '''
    
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('current', self.page.number),
            ('next', self.page.next_page_number() if self.page.has_next() else None),
            ('previous', self.page.previous_page_number()  if self.page.has_previous() else None ),
            ('final', self.page.paginator.num_pages),
            
            ('results', data)
            
        ]))
        
class CategoryViewSet(ModelViewSet):
    """
    Viewset for Category Models, with personalized pagination class.
    """
    pagination_class = CustomPagination
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('name')


    def get_queryset(self):
        # Apply select_related to decrease the number
        # of queries and convert it into a join query
        return self.queryset.select_related('parent_id')





