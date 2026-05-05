import { ref, push, set } from 'firebase/database';

import { db } from '../firebase/firebase-config';

export interface ContactMessagePayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const CONTACT_MESSAGES_PATH = 'contact-messages';

export const saveContactMessage = async (
    payload: ContactMessagePayload
): Promise<void> => {
    const newRef = push(ref(db, CONTACT_MESSAGES_PATH));
    await set(newRef, {
        ...payload,
        createdAt: new Date().toISOString(),
    });
};
