import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'integrations' })
export class IntegrationEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'establishment_id', nullable: false })
  establishment_id: string;

  @Column({ name: 'client_id', nullable: false })
  client_id: string;

  @Column({ name: 'client_secret', nullable: false })
  client_secret: string;

  @Column({ name: 'nuvemshop_token', nullable: false })
  nuvemshop_token: string;

  @Column({ name: 'store_id', nullable: false })
  store_id: number;

  @Column({ name: 'payment_provider_id', nullable: false })
  payment_provider_id: string;

  @Column({ name: 'created_at', nullable: false })
  created_at: Date;

  @Column({ name: 'updated_at', nullable: false })
  updated_at: Date;
  
}