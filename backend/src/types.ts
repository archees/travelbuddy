export type ICreateUsersBody = {
	name: string,
	email: string,
	password: string,

}

export type IUpdateUsersBody = {
	name: string,
	id: number,
}

export type ICreateMessage = {
	sender_id: number,
	receiver_id: number,
	message: string,
}

export type ICreateReview ={
	rating:number,
	comment:string,
	reviewer_id:number,
	user_id:number
}

export type ICreateTravelPlan = {
	poster: number,
	FromlocationCity: string,
	FromlocationState: string,
	Destination: string,
	startDate: string,
	endDate: string,
	spaceAvailable: number,
	cost: number,
	requirements?: string
}

