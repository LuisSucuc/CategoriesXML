from rest_framework.views import APIView
from rest_framework.response import Response
import xml.etree.ElementTree as ET

from .serializers import CategorySerializer
from .models import Category
from rest_framework import status
import logging
from rest_framework.viewsets import ModelViewSet


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

class CategoryViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('level')

    '''
    def get_queryset(self):
        """
        Get the list of items for this view.
        This must be an iterable, and may be a queryset.
        Defaults to using `self.queryset`.
        This method should always be used rather than accessing `self.queryset`
        directly, as `self.queryset` gets evaluated only once, and those results
        are cached for all subsequent requests.
        You may want to override this if you need to provide different
        querysets depending on the incoming request.
        (Eg. return a list of items that is specific to the user)
        """
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method."
            % self.__class__.__name__
        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.all()
        return queryset
    '''