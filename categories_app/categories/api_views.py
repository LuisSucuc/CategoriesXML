from xml.dom.minidom import Element
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
import xml.etree.ElementTree as ET
from .models import Category
from django.db import connection


class ProcessFile(APIView):
    """
    """

    namespaces = {'xmlns': 'urn:ebay:apis:eBLBaseComponents'}

    def post(self, request, format=None):

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
    
        total = Category.objects.bulk_create(categories_list)
        return Response()

    def find(self, category, elementToFind):
        try:
            return category.find(f'xmlns:{elementToFind}', self.namespaces).text
        except:
            return None
    
    def to_category_object(self, category):
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


    

    
    
