using System.Linq;
using Campus.Services.Interfaces.DTO.Profile;
using FluentValidation;

namespace Campus.Master.API.Validators.Profile
{
    public class ProfileEditingValidator : AbstractValidator<ProfileEditingDto>
    {
        public ProfileEditingValidator()
        {
            RuleFor(profile => profile.FirstName)
                .NotNull().WithMessage("First name should not be null")
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name should be < 50 symbols")
                .Must(password => password.All(char.IsLetter)).WithMessage("First name should contain only letters");
            RuleFor(profile => profile.LastName)
                .NotNull().WithMessage("Last name should not be null")
                .NotEmpty().WithMessage("Last name is required")
                .MaximumLength(50).WithMessage("Last name should be < 50 symbols")
                .Must(password => password.All(char.IsLetter)).WithMessage("Last name should contain only letters");
        }
    }
}