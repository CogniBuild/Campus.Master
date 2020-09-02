using System.Linq;
using Campus.Services.Interfaces.DTO.Profile;
using FluentValidation;

namespace Campus.Master.API.Validators.Profile
{
    public class ProfileRegistrationValidator : AbstractValidator<ProfileRegistrationDto>
    {
        public ProfileRegistrationValidator()
        {
            RuleFor(profile => profile.Email)
                .NotNull().WithMessage("Email should not be null")
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Use the following email pattern example@domain.com");
            RuleFor(profile => profile.Login)
                .NotNull().WithMessage("Login should not be null")
                .NotEmpty().WithMessage("Login is required")
                .MaximumLength(200).WithMessage("Login length should be < 100 symbols");
            RuleFor(profile => profile.Password)
                .NotNull().WithMessage("Password should not be null")
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password length should be > 8 symbols")
                .MaximumLength(100).WithMessage("Password length should be < 100 symbols")
                .Must(password => password.Any(char.IsDigit)).WithMessage("Add at least one digit")
                .Must(password => password.Any(char.IsUpper)).WithMessage("Add at least one symbol in upper case");
            RuleFor(profile => profile.ConfirmPassword)
                .NotNull().WithMessage("Confirm password should not be null")
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password length should be > 8 symbols")
                .MaximumLength(100).WithMessage("Password length should be < 100 symbols")
                .Must(password => password.Any(char.IsDigit)).WithMessage("Add at least one digit")
                .Must(password => password.Any(char.IsUpper)).WithMessage("Add at least one symbol in upper case");
            RuleFor(profile => profile.FirstName)
                .NotNull().WithMessage("First name should not be null")
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name should be < 50 symbols")
                .Matches(@"^[a-zA-Z0-9 ]*$").WithMessage(@")(*&^%$#@!~_+-/*':”{}[] are forbidden");
            RuleFor(profile => profile.LastName)
                .NotNull().WithMessage("Last name should not be null")
                .NotEmpty().WithMessage("Last name is required")
                .MaximumLength(50).WithMessage("Last name should be < 50 symbols")
                .Matches(@"^[a-zA-Z0-9 ]*$").WithMessage(@")(*&^%$#@!~_+-/*':”{}[] are forbidden");
        }
    }
}