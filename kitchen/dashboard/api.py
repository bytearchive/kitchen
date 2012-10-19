"""Data API"""
# -*- coding: utf-8 -*-
import json

from django.http import HttpResponse

from kitchen.dashboard import chef
from kitchen.settings import REPO


def get_roles(request):
    """Returns all roles in the repo"""
    roles = chef.get_roles()
    return HttpResponse(json.dumps(roles), content_type="application/json")


def get_nodes(request):
    """Returns node files. If 'extended' is given, the extended version is
    returned

    """
    env = request.GET.get('env', REPO['DEFAULT_ENV'])
    roles = request.GET.get('roles', '')
    virt = request.GET.get('virt', REPO['DEFAULT_VIRT'])

    if request.GET.get('extended'):
        nodes = chef.get_nodes_extended()
    else:
        nodes = chef.get_nodes()

    if env or roles or virt:
        nodes = chef.filter_nodes(nodes, env, roles, virt)

    return HttpResponse(json.dumps(nodes), content_type="application/json")
