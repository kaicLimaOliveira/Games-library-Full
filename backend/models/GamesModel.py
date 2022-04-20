from database.database import Database


class Games:
    def __init__(self):
        self.db = Database()
        self.collection_name = 'Games'

    def create(self, data):
        res = self.db.insert(data, self.collection_name)
        return res

    def find(self, data, sort=None):  # find all
        return self.db.find(data, self.collection_name, None, sort)

    def update(self, _id, data):
        # self.validator.validate(data, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(_id, data, self.collection_name)

    def delete(self, _id):
        return self.db.delete(_id, self.collection_name)
