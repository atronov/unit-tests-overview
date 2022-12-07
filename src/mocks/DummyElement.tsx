import {getCurrentDate, getFormatDate, getRandItem} from './fakeHelpers';

export const DummyElement = ({items}: {items: string[]}) => (
    <span>
        Today is {getFormatDate(getCurrentDate())}.
        It's time to try {getRandItem(items)}.
    </span>
);
