"""Plugin loading facility"""
import os
import imp

from logbook import Logger

from kitchen.settings import BASE_PATH

log = Logger(__name__)


def import_plugin(name):
    """Tries to import given module"""
    path = os.path.join(BASE_PATH, "backends", "plugins", name + ".py")
    try:
        with open(path, 'rb') as f:
            try:
                plugin = imp.load_module(
                    "p_" + name, f, name + '.py',
                    ('.py', 'rb', imp.PY_SOURCE)
                )
            except SyntaxError as e:
                raise ImportError(str(e))
    except IOError as e:
        raise ImportError(str(e))
    return plugin


def import_plugins(enable_plugins):
    """Imports plugin python module"""
    plugins = {}
    for name in enable_plugins:
        try:
            plugins[name] = import_plugin(name)
        except ImportError as e:
            log.error("Could not load plugin '{0}'. Reason: {1}".format(name, e))
            continue
    return plugins
