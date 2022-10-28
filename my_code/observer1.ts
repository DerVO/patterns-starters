// TODO: When a user logged-in, display a toast message, fetch permissions and redirect to dashboard
// TODO: When a user logged-out, display a toast message, redirect to login page

// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)
// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)

/**
 * Responsible for auth logic
 */
class Auth {
    private _currentUser: any;
    private _loginObservers = [];
    private _logoutObservers = [];

    constructor() {
        this._currentUser = null;
    }

    get currentUser(): any {
        return this._currentUser;
    }

    signIn() {
        console.log('sign in')
        this._currentUser = {name: "Nir"};
        this._loginObservers.forEach( o => o(this._currentUser))
    }

    registerLoginObserver(loginObserver) {
        this._loginObservers.push(loginObserver)
    }

    signOut() {
        console.log('sign out')
        this._currentUser = null;
        this._logoutObservers.forEach( o => o(this._currentUser))
    }

    registerLogoutObserver(logoutObserver) {
        this._logoutObservers.push(logoutObserver)
    }
}

/**
 *  UI for displaying a message on the screen
 */
class ToastMessage {
    showToast(message: string) {
        console.log('Display toast message: ' + message);
    }
}

/**
 * Responsible for fetching a set of permissions for
 * A specific User
 */
class PermissionManager {
    getPermissionsForUser(user: any) {
        console.log('Fetching permissions for: ' + user);
    }
}

/**
 * Responsible for routing and redirects
 */
class Router {
    redirectTo(routeName: string) {
        console.log('Redirecting to ' + routeName);
    }
}


const auth = new Auth()

auth.registerLoginObserver((user) => {
    const router = new Router()
    router.redirectTo('login')
});
auth.registerLoginObserver((user) => {
    const pm = new PermissionManager()
    pm.getPermissionsForUser(user.name)
})
auth.registerLoginObserver((user) => {
    const toast = new ToastMessage()
    toast.showToast(user.name + ' logged in')
})

auth.registerLogoutObserver(() => {
    const router = new Router()
    router.redirectTo('logout')
});
auth.registerLogoutObserver(() => {
    const toast = new ToastMessage()
    toast.showToast('User logged out')
})

auth.signIn()
auth.signOut()