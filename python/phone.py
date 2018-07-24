#-*- coding: UTF-8 -*- 
import random
import csv
def createPhone():
    prelist=["180","181", "136", "152", "183", "176", "158", "135", "137", "182"]
    return random.choice(prelist)+"".join(random.choice("0123456789") for i in range(8))

with open('egg2.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile,dialect='excel')
    for i in range(0, 100000):
        l = createPhone()
        spamwriter.writerow(createPhone())