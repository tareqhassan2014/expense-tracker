import _ from 'lodash';

export function getSome(Transaction) {
    console.log(Transaction);

    const some = _(Transaction)
        .groupBy('type')
        .map((objs, key) => objs)
        .value();
    console.log(some);
}

export function getLabels() {}
