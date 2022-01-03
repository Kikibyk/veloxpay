export default interface Bill {
    id: string,
    amount: number,
    paid: {
        status: boolean,
        account: string | undefined,
        paymentType: string | undefined,
        date: number | undefined
    },
    date: number
}