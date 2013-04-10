"""Plugin that adds guest memory usage in GB"""
MIN_HOST_MEM = 1000000  # kB


def inject(node):
    """Adds guest RAM usage data to the host"""
    node.setdefault('kitchen', {})
    node['kitchen'].setdefault('data', {})
    node['kitchen']['data']['memory_usage'] = MIN_HOST_MEM
    for guest in node.get('virtualization', {}).get('guests', []):
        memory = int(guest.get('memory').get('total').rstrip('kB'))
        node['kitchen']['data']['memory_usage'] += memory
    # transform into GB
    node['kitchen']['data']['memory_usage'] /= 1000000
