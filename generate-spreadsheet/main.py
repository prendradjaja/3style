A_TO_X = 'ABCDEFGHIJKLMNOPQRSTUVWX'
BUFFER = 'CJM'
LEARN_FIRST = 'HBSX'
PIECES = ['ARE','BQN','DIF','ULG','VKP','WOT','XSH']

assert ''.join(sorted(''.join(PIECES) + BUFFER)) == A_TO_X, 'PIECES + BUFFER must equal A_TO_X'

def main():
    letters = without(A_TO_X, BUFFER)
    seen = set()
    learning_order = LEARN_FIRST + without(letters, LEARN_FIRST)
    for x in learning_order:
        for y in letters:
            pair = x + y
            if pair in seen or same_piece(x, y):
                continue
            seen.add(pair)
            seen.add(pair[::-1])
            print(pair + '.')
        print()


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
