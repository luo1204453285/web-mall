const handleSessionStorage = function(item) {
    this.get = function() {
        return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : '';
    }
    this.set = function(obj) {
        sessionStorage.setItem(item, JSON.stringify(obj));
    }
    this.remove = function() {
        sessionStorage.removeItem(item);
    }
}

export default handleSessionStorage;