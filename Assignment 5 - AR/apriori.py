import csv
from collections import defaultdict
from itertools import chain, combinations


def read_csv(filename):
    transactions = []
    for item in csv.reader(open(filename, 'r')):
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
        if float(count) / len(trans) >= min_sup:
			# check the support of the item
            curr.add(item)

    return curr


def run_apriori(min_supp, min_conf):
    transactions = read_csv('groceries.csv')
    items = find_unique_items(transactions)
    supports = defaultdict(int)
    all_itemsets = dict()
	
    itemset = calc_itemsets(transactions, min_supp, items, supports)
	
	# calc the item sets
    k = 1
    newset = itemset
    while newset != set([]):
        print(newset)
        print(len(newset))
        all_itemsets[k] = newset
		
		# join all existing sets (size k) to form sets of the size k+1
        next_set = set(
            [i.union(j) for i in newset for j in newset if len(i.union(j)) == k + 1])
        curr_set = calc_itemsets(transactions, min_supp, next_set, supports)
		
        newset = curr_set
        k += 1

	# calc the rules
    rules = []
    for k, v in all_itemsets.items():
        for item in v:
			# create all possible new combinations to create a rule from a single
			# item set.
            possib = map(frozenset, [x for x in chain(*[combinations(item, i + 1) for i, a
                                                        in enumerate(item)])])

            for element in possib:
                remain = item.difference(element)
                if len(remain) > 0:
					# check the confidence of the rule
                    c_num = float(supports[item]) / len(transactions)
                    c_denom = float(supports[element]) / len(transactions)
                    calc_confidence = c_num / c_denom
                    if calc_confidence >= min_conf:
                        rules.append(((tuple(element), tuple(remain)),
                                      calc_confidence))
    return rules


if __name__ == '__main__':
    support = 0.001
    confidence = 0.8
    rules = run_apriori(support, confidence)
	
    print('Print rules:' + str(len(rules)))
    print(sorted(rules, key=lambda x: x[1], reverse=True))
