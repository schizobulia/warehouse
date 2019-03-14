import json

class classname(object):
    # 将json字符串写到文件中
    def writeJsonFile(filePath, jsonStr):
        with open(filePath,"w") as f:
            s = json.loads(jsonStr)
            json.dump(s,f)
        pass

    # 将文本写到文件中
    # example: writeTextFile("E://work/test.json", '{"name": "tom"}\n\r')    
    def writeTextFile(filePath, textStr):
        with open(filePath,'a') as f: 
            f.write(textStr)
        pass
    pass



