// TODO: When a user logged-in, display a toast message, fetch permissions and redirect to dashboard
// TODO: When a user logged-out, display a toast message, redirect to login page

// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)
// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)

interface Subscriber<T> {
    update(state: T): void
}

class StatefulSubject<T> {
    private state: T
    private subscribers: Set<Subscriber<T>>

    constructor(initalState: T) {
        this.state = initalState;
        this.subscribers = new Set();
    }

    subscribe(subscriber:Subscriber<T>): void {
        this.subscribers.add(subscriber)
    }

    unsubscribe(subscriber:Subscriber<T>): void {
        this.subscribers.delete(subscriber)
    }

    publish(state: T): void {
        this.state = state
        this.subscribers.forEach(s => s.update(state))
    }
}

interface User {
    name?: string
    logged_in: boolean
}

/**
 * Responsible for auth logic
 */
class Auth extends StatefulSubject<User>{
    private _currentUser: any;

    constructor() {
        super({logged_in: false});
        this._currentUser = null;
    }

    get currentUser(): any {
        return this._currentUser;
    }

    signIn() {
        this._currentUser = {name: "Nir", logged_in: true};
        this.publish(this._currentUser)
    }

    signOut() {
        this._currentUser = {logged_in: false};
        this.publish(this._currentUser)
    }
}

/**
 *  UI for displaying a message on the screen
 */
class ToastMessage implements Subscriber<User>{
    update(user: User): void {
        this.showToast(user.logged_in ? user.name + ' logged in' : 'User logged out')
    }

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
        console.log('Redirectong to' + routeName);
    }
}

const auth = new Auth();
auth.subscribe(new ToastMessage())

auth.signIn();
auth.signOut();
