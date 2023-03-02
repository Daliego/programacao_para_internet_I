import requests
from bs4 import BeautifulSoup

def CharactersFromChosenNumber(string:str, numberOfCharacters:int, ordem: int):
    newPhrase: str = ''
    if ordem == -1:
        if len(string) <= numberOfCharacters:
            newPhrase = string
        else:
            for i in range(numberOfCharacters):
                newPhrase += string[i]
            newPhrase[::-1]
    if ordem == 1:
        if len(string) <= numberOfCharacters:
            newPhrase = string
        else:
            for i in range(numberOfCharacters):
                newPhrase += string[i]
    return newPhrase

def rightLeftFromChoosenNumber(phrase: str, startPoint:int):
    splitedVector = phrase.split(phrase[startPoint], 1)
    
    beforeString = CharactersFromChosenNumber(splitedVector[0][::-1], 20, -1)
    afterString = CharactersFromChosenNumber(splitedVector[1], 20, 1)
    
    print(f"Before the term: {beforeString}")
    print(f"After the term: {afterString}")
    
def main():
    print("What page you look into?")
    siteUrl: str = input("Write here the url: ")

    print("What is the term you looking for?")
    term: str = input("Write here the term: ")

    siteResponseTags = requests.get(siteUrl).content
    soup = BeautifulSoup(siteResponseTags, 'html.parser')

    numberOfRepetitions: int = 0
    
    for tags in soup.find_all():
        tagContent = tags.string

        if tagContent is None:
            continue
        
        if tagContent.find(term):
            if len(tagContent) <= 41:
                print(tagContent)
        else:
            position: int = tagContent.find(term)
            rightLeftFromChoosenNumber(tagContent, position)

        repeatedTerm: int = tagContent.count(term)
        numberOfRepetitions += repeatedTerm
    print(numberOfRepetitions)

main()