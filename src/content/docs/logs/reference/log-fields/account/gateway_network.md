---
# Code generator. DO NOT EDIT.

title: Gateway Network
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `gateway_network`.

## AccountID

Type: `string`

Cloudflare account tag.

## Action

Type: `string`

Action performed by gateway on the session.

## ApplicationIDs

Type: `array[int]`

IDs of the applications that matched the session parameters.

## ApplicationNames

Type: `array[string]`

Names of the applications that matched the session parameters.

## CategoryIDs

Type: `array[int]`

IDs of the categories that matched the session parameters.

## CategoryNames

Type: `array[string]`

Names of the categories that matched the session parameters.

## Datetime

Type: `int or string`

The date and time the corresponding network session was made (for example, '2021-07-27T00:01:07Z').

## DestinationIP

Type: `string`

Destination IP of the network session.

## DestinationIPContinentCode

Type: `string`

Continent code of the destination IP of the network session (for example, 'NA').

## DestinationIPCountryCode

Type: `string`

Country code of the destination IP of the network session (for example, 'US').

## DestinationPort

Type: `int`

Destination port of the network session.

## DetectedProtocol

Type: `string`

Detected traffic protocol of the network session.

## DeviceID

Type: `string`

UUID of the device where the network session originated from.

## DeviceName

Type: `string`

The name of the device where the HTTP request originated from (for example, 'Laptop MB810').

## Email

Type: `string`

Email associated with the user identity where the network session originated from.

## OverrideIP

Type: `string`

Overridden IP of the network session, if any.

## OverridePort

Type: `int`

Overridden port of the network session, if any.

## PolicyID

Type: `string`

Identifier of the policy/rule that was applied, if any.

## PolicyName

Type: `string`

The name of the gateway policy applied to the request, if any.

## ProxyEndpoint

Type: `string`

The proxy endpoint used on this network session, if any.

## RegistrationID

Type: `string`

The UUID of the device registration from which the network session originated.

## SNI

Type: `string`

Content of the SNI for the TLS network session, if any.

## SessionID

Type: `string`

The session identifier of this network session.

## SourceIP

Type: `string`

Source IP of the network session.

## SourceIPContinentCode

Type: `string`

Continent code of the source IP of the network session (for example, 'NA').

## SourceIPCountryCode

Type: `string`

Country code of the source IP of the network session (for example, 'US').

## SourceInternalIP

Type: `string`

Local LAN IP of the device. Only available when connected via a GRE/IPsec tunnel on-ramp.

## SourcePort

Type: `int`

Source port of the network session.

## Transport (deprecated)

Type: `string`

Transport protocol used for this session. <br />Possible values are <em>tcp</em> \| <em>quic</em> \| <em>udp</em>. Deprecated, please use TransportProtocol instead.

## TransportProtocol

Type: `string`

Transport protocol used for this session. <br />Possible values are <em>tcp</em> \| <em>quic</em> \| <em>udp</em>.

## UserID

Type: `string`

User identity where the network session originated from.

## VirtualNetworkID

Type: `string`

The identifier of the virtual network the device was connected to, if any.

## VirtualNetworkName

Type: `string`

The name of the virtual network the device was connected to, if any.
