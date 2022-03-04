class helper():
        @staticmethod
        def datetime_to_str(lst, indices):
                ret = []
                for tup in lst:
                        for index, val in enumerate(tup):
                                if index in indices:
                                        val = str(val)[:10]
                                ret.append(val)
                return tuple(ret)
                                