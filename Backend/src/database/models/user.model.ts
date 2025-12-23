import {Table,Column,Model,DataType} from "sequelize-typescript"

@Table({
  tableName : "users",
  modelName : "user",
  timestamps : true
})

class user extends Model{
  @Column({
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string

  @Column({
    type : DataType.STRING
  })
  declare username : string

  @Column({
    type : DataType.STRING
    
  })
  declare password : string

  @Column({
    type : DataType.STRING,
    unique : true,

  })
  declare email : string

  @Column({
    type : DataType.ENUM('teacher','institute','super_admin','students'),
    defaultValue : 'students'
  })
  declare role : string

}

export default user;

