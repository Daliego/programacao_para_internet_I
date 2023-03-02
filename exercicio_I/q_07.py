#Professor se rodar é baixado os arquivos do CEP em JSON
import requests

def isInvalidFormat(cep:str):
    urlFromViaCep = f"https://viacep.com.br/ws/{cep}/json/"
    response = requests.get(urlFromViaCep)
    if  response.status_code == 400:
        return True
    else:
        return False


def getAddressByCep(cep:str):
    urlFromViaCep = f"https://viacep.com.br/ws/{cep}/json/"

    response = requests.get(urlFromViaCep)

    if response.status_code == 200:
        jsonFile = open(f'viaCep({cep}).json', 'wb')
        jsonFile.write(response.content)
        return response.content

    return "Something Went Wrong"

def main():
    print("What is the cep?")
    cep:str = input("Right here: ")
    
    while isInvalidFormat(cep):
        print("Invalid Format")
        cep = input("Please right the CEP again here: ")

    responseData = getAddressByCep(cep)

    print(responseData)

main()
    