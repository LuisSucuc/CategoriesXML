from xml.dom.minidom import Element
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User
import xml.etree.ElementTree as ET

class ProcessFile(APIView):
    """
    """

    namespaces = {'xmlns': 'urn:ebay:apis:eBLBaseComponents'}
    def post(self, request, format=None):
        levels = { 
            1 : [],
            2 : [],
            3 : [],
            4 : [],
            5 : [],
            6 : [],
            7 : [],
        }

        uploaded_file = request.data['File']        
        
        # Store string file
        xml_string = ''
        # chucks() ensures that large files don’t overwhelm your system’s memory
        for part_file in uploaded_file.chunks():
            # Decode because part_file is byte types
            xml_string += part_file.decode("utf-8")

        # Convert string to processable xml
        xml_root = ET.fromstring(xml_string)
        for categories in xml_root.findall('xmlns:CategoryArray', self.namespaces):
            for category in categories.findall('xmlns:Category', self.namespaces):
                try:
                    category = {
                        'id' : int(self.find(category, 'CategoryID')),
                        'name' : self.find(category, 'CategoryName'),
                        'level' : int(self.find(category, 'CategoryLevel')),
                        'best_offer_enabled' : self.find(category, 'BestOfferEnabled')=='true',
                        'auto_pay_enabled' : self.find(category, 'AutoPayEnabled')=='true',
                        'leaf' : self.find(category, 'LeafCategory') =='true',
                        'lsd' : self.find(category, 'LSD') =='true',
                        'parent_id' : int(self.find(category, 'CategoryParentID')),
                        
                    }
                    levels[category['level']].append(category)
                    print(category)
                except:
                    print('Error')
                    levels[category['level']] = [category]
        
        return Response()

    def find(self, category, elementToFind):
        try:
            return category.find(f'xmlns:{elementToFind}', self.namespaces).text
        except:
            return None
