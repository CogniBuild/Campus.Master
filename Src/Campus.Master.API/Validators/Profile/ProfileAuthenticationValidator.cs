using System.Linq;
using Campus.Services.Interfaces.DTO.Profile;
using FluentValidation;

namespace Campus.Master.API.Validators.Profile
{
    public class ProfileAuthenticationValidator : AbstractValidator<ProfileAuthenticationDto>
    {
        public ProfileAuthenticationValidator()
        {
            RuleFor(profile => profile.Email)
                .NotNull().WithMessage("Email should not be null")
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Use the following email pattern example@domain.com");
            RuleFor(profile => profile.Password)
                .NotNull().WithMessage("Password should not be null")
                .NotEmpty().WithMessage("Password is required")
                .MinimumLength(8).WithMessage("Password length should be > 8 symbols")
                .MaximumLength(100).WithMessage("Password length should be < 100 symbols")
                .Must(password => password.Any(char.IsDigit)).WithMessage("Add at least one digit")
                .Must(password => password.Any(char.IsUpper)).WithMessage("Add at least one symbol in upper case");
        }
    }
}