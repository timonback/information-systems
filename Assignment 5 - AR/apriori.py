import os, csv
from collections import defaultdict
from itertools import chain, combinations

def read_csv(filenname):
    transactions = []
    for item in csv.reader(open(filenname, 'r')):
        transactions.append([it for it in item if it not in ''])

    return transactions


def find_unique_items(transactions):
    items = set()
    for trans in transactions:
        for item in trans:
            items.add(frozenset([item]))

    return items


def calc_itemsets(trans, min_sup, items, supports):
    local = defaultdict(int)
    curr = set()

    for item in items:
        for tran in trans:
            if item.issubset(tran):
                local[item] += 1
                supports[item] += 1

    for item, count in local.items():
        if float(count)/len(trans) >= min_sup:
            curr.add(item)

    return curr


def subsets(arr):
    return chain(*[combinations(arr, i + 1) for i, a in enumerate(arr)])


def calc_rules(all_itemsets, min_conf, supports, transactions):
    toRetItems = []
    for key, value in all_itemsets.items():
        toRetItems.extend([(tuple(item), float(supports[item])/len(transactions))
                           for item in value])

    toRetRules = []
    for key, value in all_itemsets.items()[1:]:
        for item in value:
            _subsets = map(frozenset, [x for x in subsets(item)])
            for element in _subsets:
                remain = item.difference(element)
                if len(remain) > 0:
                    c_num = float(supports[item])/len(transactions)
                    c_denom = float(supports[element])/len(transactions)
                    confidence = c_num/c_denom
                    if confidence >= min_conf:
                        toRetRules.append(((tuple(element), tuple(remain)),
                                           confidence))

    return toRetItems, toRetRules


def run_apriori(min_supp, min_conf):
    transactions = read_csv('groceries.csv')
    items = find_unique_items(transactions)
    supports = defaultdict(int)
    itemset = calc_itemsets(transactions, min_supp, items, supports)
    newset = itemset
    all_itemsets = dict()
    k = 1

    while newset != set([]):
        print(newset)
        print(len(newset))
        all_itemsets[k] = newset
        next_set = set(
            [i.union(j) for i in newset for j in newset if len(i.union(j)) == k + 1])
        k += 1
        curr_set = calc_itemsets(transactions, min_supp, next_set, supports)
        newset = curr_set

    return calc_rules(all_itemsets, min_conf, supports, transactions)


if __name__ == '__main__':
    data = run_apriori(0.001, 0.8)
    print(data)

