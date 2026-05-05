import {cases} from 'data/cases';
import {mockResponse} from 'apis/base';

export const getCaseList = () => mockResponse(cases);

export const getCaseById = (id) => mockResponse(cases.find((c) => c.id === id));
