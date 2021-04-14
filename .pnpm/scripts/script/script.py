import subprocess as sb
import sys
import json
from script import config
import os

_params = json.loads(sys.argv[1]) if len(sys.argv)>1 else {}

def params(key=None):
    if key is None:
        return _params

    key = str(key)
    if key in _params:
        return _params[key]
    return None

env = params('env') or "dev"
pkg_manager = params('use') or config('manager')

if params("reload") or env=='prod':
    sb.call(f"pip3 install -r .pnpm/requirements.txt", shell=True)
    sb.call(f"{pkg_manager} install", shell=True)

def shell(cmd):
    sb.call(cmd, shell=True)

def npm(cmd):
    shell(f"npm {cmd}")
    
def run(script):
    sb.call(f"python3 .pnpm/scripts/{script}", shell=True)

def popen(cmd):
    proc = sb.Popen(cmd, stdout=sb.PIPE, shell=True)
    return proc.communicate()[0] == 0
    