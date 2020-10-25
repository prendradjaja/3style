import csv
import random
import collections

targets = ['UBL','UBR','UFL','LUB','LUF','LDF','LDB','FUL','FDR','FDL','RUB','RDB','RDF','BUR','BUL','BDL','BDR','DFL','DFR','DBR','DBL']


def first_key(my_dict):
    return next(iter(my_dict))

def transpose(d):
    inverted = collections.defaultdict(dict)
    for key,subd in d.items():
        for k,v in subd.items():
            inverted[k][key] = v
    return inverted



class Table:
    def __init__(self, path):
    # def __init__(self, path, inverse_fallback=False):
    #     self.inverse_fallback = inverse_fallback
        with open(path, newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter='\t')
            self.rows = [row for row in reader]

    def get(self, t1, t2):
        i = self.rows[0].index(t1)
        row = [row for row in self.rows if row[0] == t2][0]
        return row[i] or None

def num_setup_moves(alg):
    if ':' not in alg:
        return 0
    return len(alg.split(':')[0].split())

# filename = 'daniel-lin.csv'  # TODO: `targets` is hard-coded to max-hilliard.csv
filename = 'max-hilliard.csv'
maxtable = Table(filename)
cases_by_setup_length = collections.defaultdict(list)
n = 4

Case = collections.namedtuple('Case', 'targets alg')

for t1 in targets:
    for t2 in targets:
        alg = maxtable.get(t1, t2)
        if not alg:
            continue
        setup_length = num_setup_moves(alg)
        cases_by_setup_length[setup_length].append(Case(t1 + ' ' + t2, alg))

print(f"{filename}:")
for n in sorted(cases_by_setup_length):
    print(f"  Cases with {n} setup moves: {len(cases_by_setup_length[n])}")
print("4 random 0-setup cases:")
print()

for i in range(4):
    print(random.choice(cases_by_setup_length[0]).targets)
