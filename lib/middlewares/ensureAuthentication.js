import { getAuth } from 'firebase-admin/auth';
import { ApiError } from '../exceptions/ApiError.js';
export async function ensureAuthentication(request, _, nextFunction) {
    const { authorization } = request.headers;
    if (!authorization) {
        throw new ApiError('JWT token is missing', 'application/token-missing');
    }
    const parts = authorization.split(' ');
    if (parts.length !== 2) {
        throw new ApiError('Token malformatted.', 'application/token-malformatted', 406);
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        throw new ApiError('Token malformatted.', 'application/token-malformatted', 406);
    }
    try {
        const decoded = await getAuth().verifyIdToken(token);
        request.user = {
            uid: decoded.uid,
            email: decoded.email
        };
    }
    catch {
        throw new ApiError('Invalid token', 'application/invalid-token', 401);
    }
    nextFunction();
}
