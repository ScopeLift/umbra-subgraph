import { Announcement, OwnershipTransferred, TokenWithdrawal } from '../generated/Umbra/Umbra';
import { StealthKeyChanged } from '../generated/StealthKeyRegistry/StealthKeyRegistry';
import { AnnouncementEntity, StealthKeyChangedEntity } from '../generated/schema';

export function handleAnnouncement(event: Announcement): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  const id = event.block.number.toString().padStart(16, '0') + '-' + event.logIndex.toString().padStart(16, '0');
  let entity = AnnouncementEntity.load(id);

  // Entities only exist after they have been saved to the store; `null` checks allow to create entities on demand
  if (!entity) {
    entity = new AnnouncementEntity(id);
  }

  // Entity fields can be set based on event parameters
  entity.receiver = event.params.receiver;
  entity.amount = event.params.amount;
  entity.token = event.params.token;
  entity.pkx = event.params.pkx;
  entity.ciphertext = event.params.ciphertext;
  entity.timestamp = event.block.timestamp;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.from = event.transaction.from;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.owner(...)
  // - contract.tokenPayments(...)
  // - contract.toll(...)
  // - contract.tollCollector(...)
  // - contract.tollReceiver(...)
}

export function handleStealthKeyChanged(event: StealthKeyChanged): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  const id = event.block.number.toString().padStart(16, '0') + '-' + event.logIndex.toString().padStart(16, '0');
  let entity = StealthKeyChangedEntity.load(id);

  // Entities only exist after they have been saved to the store; `null` checks allow to create entities on demand
  if (!entity) {
    entity = new StealthKeyChangedEntity(id);
  }

  // Entity fields can be set based on event parameters
  entity.registrant = event.params.registrant;
  entity.spendingPubKeyPrefix = event.params.spendingPubKeyPrefix
  entity.spendingPubKey = event.params.spendingPubKey;
  entity.viewingPubKeyPrefix = event.params.viewingPubKeyPrefix;
  entity.viewingPubKey = event.params.viewingPubKey;
  entity.timestamp = event.block.timestamp;
  entity.block = event.block.number;
  entity.txHash = event.transaction.hash;
  entity.from = event.transaction.from;

  // Entities can be written to the store with `.save()`
  entity.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // do nothing
}

export function handleTokenWithdrawal(event: TokenWithdrawal): void {
  // do nothing
}
