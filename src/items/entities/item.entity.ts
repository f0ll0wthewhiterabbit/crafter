import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  imageSrc: string

  @Column({ nullable: true })
  belongsTo: string | null

  @Column({ type: 'timestamp', nullable: true })
  baggageDate: Date | null

  @Column({ type: 'timestamp', nullable: true })
  craftDate: Date | null

  @Column({ default: false })
  isParent: boolean

  @Column({ nullable: true })
  parentRecipe: string

  @Column('text', { array: true, default: [] })
  parentItems: string[]

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
