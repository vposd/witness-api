export interface DbContext<Client, Db> {
  db: Promise<Db>;
  client: Promise<Client>;
  connect(...args: any[]): Promise<Client>;
  close(): Promise<void>;
}