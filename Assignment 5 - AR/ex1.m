M = readtable('groceries.csv','ReadVariableNames',false);

items = table2array(M);
items = items(:);

items_unique = unique(items);

dist_data = [];
% skip first item, as it is the empty string
for item_i = 2:size(items_unique,1)
    item = items_unique{item_i};
    cnt = length(find(ismember(items, item)));
    dist_data(end+1,:) = [item_i cnt];
end

bar(1:size(dist_data, 1), dist_data(:,2));
% again adjustment for empty string
set(gca, 'XTickLabel',items_unique, 'XTick',0:size(items_unique, 1)-1)
set(gca,'XTickLabelRotation',90)
title('Distribution of bought items')
ylabel('# of Occurences')
print('histogram.png', '-dpng')