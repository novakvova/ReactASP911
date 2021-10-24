﻿using AutoPart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPart.Exceptions
{
    public class AccountException : Exception
    {
        public AccountException(AccountError accountError)
        {
            AccountError = accountError;
        }
        public AccountError AccountError { get; private set; }
    }
}
