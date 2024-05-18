import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  OwnershipTransferred,
  RentalClosed,
  RentalListed,
  TenantApplied,
  TenantSelected,
  Transfer
} from "../generated/Rental/Rental"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRentalClosedEvent(agreementId: BigInt): RentalClosed {
  let rentalClosedEvent = changetype<RentalClosed>(newMockEvent())

  rentalClosedEvent.parameters = new Array()

  rentalClosedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )

  return rentalClosedEvent
}

export function createRentalListedEvent(
  agreementId: BigInt,
  propertyId: BigInt,
  tokenId: BigInt
): RentalListed {
  let rentalListedEvent = changetype<RentalListed>(newMockEvent())

  rentalListedEvent.parameters = new Array()

  rentalListedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  rentalListedEvent.parameters.push(
    new ethereum.EventParam(
      "propertyId",
      ethereum.Value.fromUnsignedBigInt(propertyId)
    )
  )
  rentalListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return rentalListedEvent
}

export function createTenantAppliedEvent(
  agreementId: BigInt,
  applicant: Address
): TenantApplied {
  let tenantAppliedEvent = changetype<TenantApplied>(newMockEvent())

  tenantAppliedEvent.parameters = new Array()

  tenantAppliedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  tenantAppliedEvent.parameters.push(
    new ethereum.EventParam("applicant", ethereum.Value.fromAddress(applicant))
  )

  return tenantAppliedEvent
}

export function createTenantSelectedEvent(
  agreementId: BigInt,
  tenant: Address
): TenantSelected {
  let tenantSelectedEvent = changetype<TenantSelected>(newMockEvent())

  tenantSelectedEvent.parameters = new Array()

  tenantSelectedEvent.parameters.push(
    new ethereum.EventParam(
      "agreementId",
      ethereum.Value.fromUnsignedBigInt(agreementId)
    )
  )
  tenantSelectedEvent.parameters.push(
    new ethereum.EventParam("tenant", ethereum.Value.fromAddress(tenant))
  )

  return tenantSelectedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
