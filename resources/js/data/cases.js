import {part1Physical} from './cases/part1Physical';
import {part2Intimacy} from './cases/part2Intimacy';
import {part3Property} from './cases/part3Property';
import {part4HumanRight} from './cases/part4HumanRight';
import {part5Finance, epilogue} from './cases/part5Finance';
import {part6Supernatural} from './cases/part6Supernatural';

export const cases = [
    ...part1Physical,
    ...part2Intimacy,
    ...part3Property,
    ...part4HumanRight,
    ...part5Finance,
    ...part6Supernatural,
    epilogue,
];
