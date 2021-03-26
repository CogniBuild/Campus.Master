#!/bin/bash
MIGRATION_HASH=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 13);
dotnet ef migrations add $MIGRATION_HASH --project=../Campus.Infrastructure.Data.EntityFrameworkCore;
