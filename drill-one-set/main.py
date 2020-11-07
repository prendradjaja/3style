import random

A_TO_X = 'ABCDEFGHIJKLMNOPQRSTUVWX'
BUFFER = 'CJM'
PIECES = ['ARE','BQN','DIF','ULG','VKP','WOT','XSH']


def main():
    letters = without(A_TO_X, BUFFER)
    x = input('Drill which set? (e.g. B) ')
    pairs = []
    for y in letters:
        if same_piece(x, y):
            continue
        pairs.append(random.choice([x + y, y + x]))
    random.shuffle(pairs)
    for (i, p) in enumerate(pairs):
        if i % 4 == 0:
            print()
        print(p)


def without(s, remove):
    return ''.join(c for c in s if c not in remove)

def same_piece(x, y):
    return piece_index(x) == piece_index(y)

def piece_index(x):
    for i, piece in enumerate(PIECES):
        if x in piece:
            return i
    raise ValueError('Piece not found')

main()
