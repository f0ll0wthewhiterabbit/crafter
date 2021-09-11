import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  imageSrc: string

  @Column('text', { array: true })
  itemTitles: string[]

  @Column({ nullable: true })
  belongsTo: string | null

  @Column({ type: 'timestamp', nullable: true })
  baggageDate: Date | null

  @Column({ default: false })
  isParent: boolean

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
