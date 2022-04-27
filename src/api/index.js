
import { deleteReq, get, post, put, putFile } from './fetch';
import { BOOKING } from './endpoints';

export const addBooking = (body) => {
	return post({ url: BOOKING, shouldAuthenticate: true, body, contentType: 'application/json' });
};

export const getBookingList = () => {
	return get({ url: BOOKING, shouldAuthenticate: true });
};
