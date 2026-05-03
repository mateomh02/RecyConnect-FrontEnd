export interface RegisterProps {
    name: string,
    email: string,
    password: string,
    roleId: string
}

export interface RegisterResponse {
    message: string,
    data: {
        id: number,
        email: string,
        name: string
    }
}
