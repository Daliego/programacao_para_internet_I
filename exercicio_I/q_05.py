import requests
from bs4 import BeautifulSoup

def search(phrase: str):
    url = "http://www.google.com/search"

    if phrase.find(" "):
        phrase = phrase.split(" ")
        phrase = "+".join(phrase)

    responseResearch = requests.get(url + f"?q={phrase}")    
    soup = BeautifulSoup(responseResearch.content, 'html.parser')

    for tags in soup.find_all():
        content = tags.string

        if content is None:
            continue
        else:
            print(content)
    print(responseResearch.text)

def main():
    print("What should I search?")
    q = input("Write here: ")
    search(q)

main()