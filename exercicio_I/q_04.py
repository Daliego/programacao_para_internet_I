#Professor se rodar o código a imagem é baixada.
import requests

def main():
    imageUrl = "https://www.python.org/static/community_logos/python-logo-master-v3-TM.png"

    responseFromUrl = requests.get(imageUrl)
    
    if responseFromUrl.status_code == 200:
        photo = open('python-logo-master-v3-TM.png', 'wb')    
        photo.write(responseFromUrl.content)
    

main()
