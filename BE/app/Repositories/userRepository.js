class UserRepository {
    async getUsers() {
        return [
            {
                username: "Nocturne",
                score: 5000,
            },
            {
                username: "Draven",
                score: 4000,
            },
            {
                username: "Annie",
                score: 20,
            },
        ];
    }
}

module.exports = new UserRepository();