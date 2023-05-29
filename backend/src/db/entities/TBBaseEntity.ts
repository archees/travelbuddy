import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";

@SoftDeletable(() => TBBaseEntity, "deleted_at", () => new Date())
//https://mikro-orm.io/docs/defining-entities/#using-mikroorms-baseentity-previously-wrappedentity
export class TBBaseEntity extends BaseEntity<TBBaseEntity, "id"> {
  @PrimaryKey()
	id!: number;
	
	@Property()
	created_at = new Date();
	
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();

	@Property({ nullable: true })
	deleted_at?: Date;
}
