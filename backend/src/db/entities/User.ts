import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { TBBaseEntity } from "./TBBaseEntity.js";
import {Reviews} from "./Reviews.js";

import { Enum } from "@mikro-orm/core";
import { Message } from "./Message.js";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends TBBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string


	@Enum(() => UserRole)
	role!: UserRole; // string enum

	// Note that these DO NOT EXIST in the database itself!

	// Orphan removal used in our Delete All Sent Messages route to single-step remove via Collection
	@OneToMany(
		() => Message,
		message => message.sender,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_sent!: Collection<Message>;

	@OneToMany(
		() => Message,
		message => message.receiver,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	messages_received!: Collection<Message>;

	@OneToMany(
		() => Reviews,
		review => review.user,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	user_reviews!: Collection<Message>;
}
