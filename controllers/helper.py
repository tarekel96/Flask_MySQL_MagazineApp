class helper():
        @staticmethod
        def datetime_to_str(lst, indices):
                print(lst, indices)
                ret = []
                for tup in lst:
                        curr_lst = []
                        for index, val in enumerate(tup):
                                if index in indices:
                                        val = str(val)[:10]
                                curr_lst.append(val)
                        ret.append(curr_lst)
                return ret
                                