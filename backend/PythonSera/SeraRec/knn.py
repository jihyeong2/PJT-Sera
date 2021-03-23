from database import connectMySQL
def selectItemIds():
    connect, curs = connectMySQL()
    query = """SELECT item_id FROM item"""
    curs.execute(query)
    items = curs.fetchall()
    connect.close()
    items = [i[0] for i in items]
    return sorted(items)


if __name__ == '__main__':
    test = selectItemIds()
    print(test[:5])