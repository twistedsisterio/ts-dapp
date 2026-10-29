import _ from 'lodash';

export function getContractAddressFromTruffleConf(truffleConf: any, chainId: number) {
    const {networks} = truffleConf;
    if (networks[chainId.toString()]) {
        const address = networks[chainId.toString()].address;
        return address ? address : '';
    }
    return '';
}

export function getDomain(network: string, root: string) {
    return _.intersection([network], ['ropsten', 'rinkeby']).length > 0 ?
        `https://${network}.${root}.io` : `https://${root}.io`;
}

export async function fetchEvents(eventName: string, contract: any, provider: any, fromBlock: number) {
    const eventFilter = contract.filters[eventName]();
    eventFilter.fromBlock = fromBlock;
    eventFilter.toBlock = "latest";

    let events = (await provider.getLogs(eventFilter)) || [];
    return events.map((event: any) => {
        const parsedEvent = contract.interface.parseLog(event);
        return parsedEvent.values;
    });
}
// ipfs.io blocks requests coming from websites (403/429), so serve IPFS
// content through another public gateway. The URLs stored on-chain and in
// the token metadata still point at ipfs.io, so they are rewritten here.
export const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

export function ipfsUrl(url: string): string {
    return url ? url.replace(/^https?:\/\/(gateway\.)?ipfs\.io\/ipfs\//, IPFS_GATEWAY) : url;
}
