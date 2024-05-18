import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RentalClosed as RentalClosedEvent,
  RentalListed as RentalListedEvent,
  TenantApplied as TenantAppliedEvent,
  TenantSelected as TenantSelectedEvent,
  Transfer as TransferEvent
} from "../generated/Rental/Rental"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  RentalClosed,
  RentalListed,
  TenantApplied,
  TenantSelected,
  Transfer
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentalClosed(event: RentalClosedEvent): void {
  let entity = new RentalClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentalListed(event: RentalListedEvent): void {
  let entity = new RentalListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId
  entity.propertyId = event.params.propertyId
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTenantApplied(event: TenantAppliedEvent): void {
  let entity = new TenantApplied(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId
  entity.applicant = event.params.applicant

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTenantSelected(event: TenantSelectedEvent): void {
  let entity = new TenantSelected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agreementId = event.params.agreementId
  entity.tenant = event.params.tenant

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
